describe("Items", function () {
  context("Tests Valid", function () {
    it("Should be true is classList is less than or equal to classSize", function () {
      //should allow add students to be added when spaces are available for classSize
      let classList = [
        "Susan",
        "Sam",
        "Sally",
        "jack",
        "john",
        "marcus",
        "dan",
        "lash",
        "nate",
      ];
      let maxClassSize = 15;
      let reservedSlots = 2;
      let classSize = maxClassSize - reservedSlots;

      chai.assert.isTrue(
        canAddAStudent(classList, maxClassSize, reservedSlots)
      );
    });
  });

//   context("Tests Not Valid", function () {
//     it("Should be false if classList is larger than classSize", function () {
//       //should not allow add students to be added when spaces are not available for classSize
//       let classList = [
//         "Susan",
//         "Sam",
//         "Sally",
//         "jack",
//         "john",
//         "marcus",
//         "dan",
//         "lash",
//         "nate",
//       ];
//       let maxClassSize = 10;
//       let reservedSlots = 2;
//       let classSize = maxClassSize - reservedSlots;

//       chai.assert.isFalse(
//         canAddAStudent(classList, maxClassSize, reservedSlots)
//       );
//     });

//     it("Should be -1 if reservedSlots is greater than maxClassSize", function () {
//       //return -1 when reservedSpots is greater than maxClassSize
//       let classList = [
//         "Susan",
//         "Sam",
//         "Sally",
//         "jack",
//         "john",
//         "marcus",
//         "dan",
//         "lash",
//         "nate",
//       ];
//       let maxClassSize = 10;
//       let reservedSlots = 11;
//       let classSize = maxClassSize - reservedSlots;

//       chai.assert(canAddAStudent(classList, maxClassSize, reservedSlots), -1);
//     });

//     it("Should return error when maxClassSize is negative", function () {
//       //return error when maxClassSize is negative
//       let classList = [];
//       let maxClassSize = -1;
//       let reservedSlots = 0;
//       let classSize = maxClassSize - reservedSlots;
//       let error = "Error: Cannot have negative max class size";

//       chai.assert(
//         canAddAStudent(classList, maxClassSize, reservedSlots),
//         error
//       );
//     });

//     it("Should return error when reservedSpots is negative", function () {
//       //return error when maxClassSize is negative
//       let classList = [];
//       let maxClassSize = 10;
//       let reservedSlots = -1;
//       let classSize = maxClassSize - reservedSlots;
//       let error = "Error: Cannot have negative reserved spots";

//       chai.assert(
//         canAddAStudent(classList, maxClassSize, reservedSlots),
//         error
//       );
//     });
//   });
// });
