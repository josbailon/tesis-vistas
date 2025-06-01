"use client"

import { Calendar, Clock, MapPin, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrafficLight } from "@/components/traffic-light"

interface StudentScheduleProps {
  selectedStudent: string | null
}

// Mock schedule data
const scheduleData = [
  {
    id: "1",
    title: "Mathematics 101",
    time: "09:00 - 10:30",
    location: "Room A-101",
    instructor: "Dr. Smith",
    type: "lecture",
    day: "Monday",
  },
  {
    id: "2",
    title: "Physics Lab",
    time: "14:00 - 16:00",
    location: "Lab B-205",
    instructor: "Prof. Johnson",
    type: "lab",
    day: "Monday",
  },
  {
    id: "3",
    title: "Computer Science",
    time: "10:00 - 11:30",
    location: "Room C-301",
    instructor: "Dr. Wilson",
    type: "lecture",
    day: "Tuesday",
  },
  {
    id: "4",
    title: "Study Group",
    time: "15:00 - 17:00",
    location: "Library",
    instructor: "Self-study",
    type: "study",
    day: "Wednesday",
  },
]

export function StudentSchedule({ selectedStudent }: StudentScheduleProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-800"
      case "lab":
        return "bg-green-100 text-green-800"
      case "study":
        return "bg-purple-100 text-purple-800"
      case "exam":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrafficLightStatus = (item: any) => {
    const now = new Date()
    const currentHour = now.getHours()
    const itemHour = Number.parseInt(item.time.split(":")[0])

    if (Math.abs(currentHour - itemHour) <= 1) return "pending"
    if (item.type === "exam") return "unavailable"
    return "available"
  }

  if (!selectedStudent) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Student Selected</h3>
          <p className="text-gray-600 text-center">Select a student from the overview tab to view their schedule</p>
        </CardContent>
      </Card>
    )
  }

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
          <CardDescription>Class schedule and academic activities for the selected student</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {daysOfWeek.map((day) => {
          const daySchedule = scheduleData.filter((item) => item.day === day)

          return (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="text-lg">{day}</CardTitle>
              </CardHeader>
              <CardContent>
                {daySchedule.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No classes scheduled</p>
                ) : (
                  <div className="space-y-4">
                    {daySchedule.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-4">
                          <TrafficLight status={getTrafficLightStatus(item)} size="sm" />
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{item.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{item.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{item.instructor}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
