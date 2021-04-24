function canAddAStudent(classList, maxClassSize, reservedSlots) {
  // ClassList -> an array of student names in the class
  //   E.g., classList = ['Susan', 'Sam', 'Sally' ];
  // maxClassSize -> The largest a class can hold
  //    e.g., maxClassSize = 10;
  // reservedSlots > The number of slots reserved for 'special' cases;
  //    So the effective class size is maxClassSize - reservedSlots
  //    For example if maxClassSize = 10 and reserverSlots = 2
  //          then you cannot put more than 8 students in the clas
  //    The length of the classList will tell you how many students
  //    are already in the class.
  // Return true - if can add another student to the class
  // Return false - if the class is full
  // Return -1 if input error (classList is already > maxSize)
  //
  // Example 1 :
  //       classList has 9 student on it
  //       maxClassSize is 15
  //       reservedSlots is 2
  //       Then can add up to 13 students - return true
  // Example 2, classList has 9 student on it
  //       maxClassSize is 10
  //       reservedSlots is 2
  // then cannot add any more students - return false
  if (reservedSlots > maxClassSize) {
    return -1;
  }
  if (maxClassSize < 0) {
    return "Error: Cannot have negative max class size";
  }
  if (reservedSlots < 0) {
    return "Error: Cannot have negative reserved spots";
  }
  let effectiveClassSize = Math.abs(maxClassSize - reservedSlots);
  if (classList.length + 1 > effectiveClassSize) {
    return false;
  }
  return true;
}
