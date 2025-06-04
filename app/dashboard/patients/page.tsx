"use client"

import { useState } from "react"

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Dummy patient data
  const patients = [
    { id: 1, name: "John Doe", age: 32, condition: "Diabetes" },
    { id: 2, name: "Jane Smith", age: 45, condition: "Hypertension" },
    { id: 3, name: "Robert Jones", age: 60, condition: "Arthritis" },
    { id: 4, name: "Emily Brown", age: 28, condition: "Asthma" },
    { id: 5, name: "Michael Davis", age: 50, condition: "Heart Disease" },
  ]

  const filteredPatients = patients.filter((patient) => {
    const searchMatch = patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    const filterMatch = filter === "all" || patient.condition.toLowerCase() === filter
    return searchMatch && filterMatch
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
        />
        <div className="ml-4">
          <button
            className="px-4 py-2 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="px-4 py-2 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
            onClick={() => setFilter("diabetes")}
          >
            Diabetes
          </button>
          <button
            className="px-4 py-2 rounded-lg border border-blue-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
            onClick={() => setFilter("hypertension")}
          >
            Hypertension
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="medical-card hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold">{patient.name}</h2>
              <p>Age: {patient.age}</p>
              <p>Condition: {patient.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PatientsPage
