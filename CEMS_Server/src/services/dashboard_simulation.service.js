import Factory from "../models/Factory.models.js";
import Sensor from "../models/sensor.models.js";
import EmissionReading from "../models/EmisionReading.models.js";

import ApiError from "../utils/ApiError.utils.js";


// =========================================================
// Compliance Limits
// =========================================================
//
// Replace these values with the actual limits used by
// your CEMS / compliance rules.
//
// warning  -> warning threshold
// violation -> violation threshold
// =========================================================

const COMPLIANCE_LIMITS = {
    pm25: {
        warning: 80,
        violation: 100,
    },

    pm10: {
        warning: 150,
        violation: 200,
    },

    so2: {
        warning: 60,
        violation: 80,
    },

    nox: {
        warning: 80,
        violation: 100,
    },

    co: {
        warning: 8,
        violation: 10,
    },
};


// =========================================================
// Get Area Compliance
// =========================================================

export const getdashboarddata = async () => {

    // -----------------------------------------------------
    // 1. Get all active factories
    // -----------------------------------------------------

    const factories = await Factory.find({
        status: "active",
    })
        .select(
            "factoryId name industryType location status"
        )
        .lean();


    if (!factories.length) {
        throw new ApiError(
            404,
            "No active factories found"
        );
    }


    // -----------------------------------------------------
    // 2. Get all sensors for these factories
    // -----------------------------------------------------

    const factoryObjectIds = factories.map(
        (factory) => factory._id
    );


    const sensors = await Sensor.find({
        factoryId: {
            $in: factoryObjectIds,
        },
    })
        .select(
            "sensorId factoryId sensorType status lastSeen healthScore"
        )
        .lean();


    // -----------------------------------------------------
    // 3. Group sensors by factory
    // -----------------------------------------------------

    const sensorsByFactory = new Map();


    sensors.forEach((sensor) => {

        const factoryId =
            sensor.factoryId.toString();


        if (!sensorsByFactory.has(factoryId)) {

            sensorsByFactory.set(
                factoryId,
                []
            );
        }


        sensorsByFactory
            .get(factoryId)
            .push(sensor);
    });


    // -----------------------------------------------------
    // 4. Get latest reading for every factory
    // -----------------------------------------------------

    const latestReadings = await EmissionReading.aggregate([

        {
            $match: {
                factoryId: {
                    $in: factoryObjectIds,
                },
            },
        },

        {
            $sort: {
                timestamp: -1,
            },
        },

        {
            $group: {
                _id: "$factoryId",
                reading: {
                    $first: "$$ROOT",
                },
            },
        },

    ]);


    // -----------------------------------------------------
    // 5. Create lookup for latest readings
    // -----------------------------------------------------

    const readingsByFactory = new Map();


    latestReadings.forEach((item) => {

        readingsByFactory.set(
            item._id.toString(),
            item.reading
        );
    });


    // -----------------------------------------------------
    // 6. Overall counters
    // -----------------------------------------------------

    let compliant = 0;

    let warnings = 0;

    let violations = 0;

    let totalConnectedDevices = 0;


    // -----------------------------------------------------
    // 7. Factory-level data
    // -----------------------------------------------------

    const factoryData = factories.map((factory) => {

        const factoryId =
            factory._id.toString();


        const factorySensors =
            sensorsByFactory.get(factoryId) || [];


        // -------------------------------------------------
        // Count active sensors
        // -------------------------------------------------

        const connectedDevices =
            factorySensors.filter(
                (sensor) =>
                    sensor.status === "active"
            ).length;


        totalConnectedDevices +=
            connectedDevices;


        // -------------------------------------------------
        // Latest emission reading
        // -------------------------------------------------

        const latestReading =
            readingsByFactory.get(factoryId);


        // -------------------------------------------------
        // Determine compliance
        // -------------------------------------------------

        let complianceStatus =
            "warning";


        const exceededParameters = [];

        const warningParameters = [];


        if (!latestReading) {

            // No reading means we cannot confirm compliance.
            complianceStatus = "warning";

        } else if (
            latestReading.validationStatus ===
            "invalid"
        ) {

            // Invalid CEMS data
            complianceStatus = "violation";

        } else if (
            latestReading.validationStatus ===
            "suspicious"
        ) {

            // Suspicious data requires attention
            complianceStatus = "warning";

        } else {

            const pollutants =
                latestReading.pollutants || {};


            // ---------------------------------------------
            // Check every pollutant
            // ---------------------------------------------

            Object.entries(
                COMPLIANCE_LIMITS
            ).forEach(
                ([pollutant, limits]) => {

                    const value =
                        pollutants[pollutant];


                    // Missing value
                    if (
                        value === null ||
                        value === undefined
                    ) {

                        warningParameters.push(
                            pollutant
                        );

                        return;
                    }


                    // Violation
                    if (
                        value >=
                        limits.violation
                    ) {

                        exceededParameters.push({
                            pollutant,
                            value,
                            limit:
                                limits.violation,
                        });

                        return;
                    }


                    // Warning
                    if (
                        value >=
                        limits.warning
                    ) {

                        warningParameters.push({
                            pollutant,
                            value,
                            limit:
                                limits.warning,
                        });
                    }
                }
            );


            // ---------------------------------------------
            // Final factory status
            // ---------------------------------------------

            if (
                exceededParameters.length > 0
            ) {

                complianceStatus =
                    "violation";

            } else if (
                warningParameters.length > 0
            ) {

                complianceStatus =
                    "warning";

            } else {

                complianceStatus =
                    "compliant";
            }
        }


        // -------------------------------------------------
        // Update overall counters
        // -------------------------------------------------

        if (
            complianceStatus ===
            "compliant"
        ) {

            compliant++;

        } else if (
            complianceStatus ===
            "violation"
        ) {

            violations++;

        } else {

            warnings++;
        }


        // -------------------------------------------------
        // Return factory information
        // -------------------------------------------------

        return {

            factoryId:
                factory.factoryId,

            name:
                factory.name,

            industryType:
                factory.industryType,

            status:
                factory.status,

            connectedDevices,

            totalDevices:
                factorySensors.length,

            complianceStatus,

            exceededParameters,

            warningParameters,

            latestReading:
                latestReading || null,
        };
    });


    // -----------------------------------------------------
    // 8. Calculate area compliance percentage
    // -----------------------------------------------------

    const totalFactories =
        factories.length;


    const compliancePercentage =
        Number(
            (
                (compliant /
                    totalFactories) *
                100
            ).toFixed(2)
        );


    // -----------------------------------------------------
    // 9. Return final area data
    // -----------------------------------------------------

    return {

        totalFactories,

        totalConnectedDevices,

        compliance: {

            compliant,

            warnings,

            violations,

            percentage:
                compliancePercentage,
        },

        factories:
            factoryData,
    };
};