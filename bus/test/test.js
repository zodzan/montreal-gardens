const { st, db, initDatabase } = require("../services/database");

describe("Stop Service", function() {
    before("Initialize database", function() {
        return initDatabase().catch(err => {
            return Promise.reject(new Error("Could not initialize database"));
        });
    });

    describe('#getStopsByDistance()', function() {
        beforeEach("Delete stops in database", function() {
            return db("stops").del().catch(err => {
                return Promise.reject(new Error("Could not clear stops table"));
            });
        });

        describe("findNoStops", function() {
            it("should return an empty list");
        });

        describe("findOneStopOrMore", function() {
            it("should return a list with at least one stop");
        });
    });
});