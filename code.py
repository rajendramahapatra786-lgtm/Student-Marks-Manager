def calculate_grade(avg):
    if avg >= 90:
        return "A"
    elif avg >= 75:
        return "B"
    elif avg >= 60:
        return "C"
    elif avg >= 40:
        return "D"
    else:
        return "Fail"


def student_mark_manager():
    name = input("Enter student name: ")
    roll = input("Enter roll number: ")

    marks = []
    subjects = int(input("Enter number of subjects: "))

    for i in range(subjects):
        mark = int(input(f"Enter marks for subject {i+1}: "))
        marks.append(mark)

    total = sum(marks)
    average = total / subjects
    grade = calculate_grade(average)

    print("\n--- Student Report ---")
    print("Name:", name)
    print("Roll No:", roll)
    print("Total Marks:", total)
    print("Average:", average)
    print("Grade:", grade)

student_mark_manager()

