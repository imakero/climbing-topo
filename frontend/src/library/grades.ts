export const grades = [
  "2",
  "2+",
  "3",
  "3+",
  "4A",
  "4B",
  "4C",
  "5A",
  "5B",
  "5C",
  "6A",
  "6A+",
  "6B",
  "6B+",
  "6C",
  "6C+",
  "7A",
  "7A+",
  "7B",
  "7B+",
  "7C",
  "7C+",
  "8A",
  "8A+",
  "8B",
  "8B+",
  "8C",
  "8C+",
  "9A",
  "9A+",
  "9B",
  "9B+",
  "9C",
  "9C+",
];

export const gradeToIndex = grades.reduce(
  (acc, grade, index) => ({ ...acc, [grade]: index }),
  {},
);
