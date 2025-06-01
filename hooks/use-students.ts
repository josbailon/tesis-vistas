"use client"

import { useState } from "react"

interface Student {
  id: string
  name: string
  email: string
  course: string
  year: string
  status: "active" | "inactive" | "graduated" | "suspended"
  attendanceRate: number
  avatar?: string
  createdAt: string
}

// Mock initial data
const initialStudents: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    course: "Computer Science",
    year: "3",
    status: "active",
    attendanceRate: 95,
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    course: "Engineering",
    year: "2",
    status: "active",
    attendanceRate: 87,
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol.davis@university.edu",
    course: "Medicine",
    year: "4",
    status: "active",
    attendanceRate: 92,
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@university.edu",
    course: "Business Administration",
    year: "1",
    status: "active",
    attendanceRate: 78,
    createdAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Eva Brown",
    email: "eva.brown@university.edu",
    course: "Law",
    year: "3",
    status: "inactive",
    attendanceRate: 65,
    createdAt: "2024-09-01T00:00:00Z",
  },
]

export function useStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents)

  const addStudent = (student: Omit<Student, "id" | "createdAt">) => {
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setStudents((prev) => [...prev, newStudent])
  }

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, ...updates } : student)))
  }

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const getStudentById = (id: string) => {
    return students.find((student) => student.id === id)
  }

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  }
}
