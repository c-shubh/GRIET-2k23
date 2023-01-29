import React, { useState, useEffect } from "react";
import { Table, Input, Select } from "antd";



const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filters, setFilters] = useState({
    studentRollNo: "",
    teacherID: "",
    classID: ""
  });

  useEffect(() => {
    fetch("/api/hello")
      .then(res => res.json())
      .then(data => setAttendanceData(data));
  }, []);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredData = attendanceData.filter(attendance => {
    return (
      attendance.studentRollNo.includes(filters.studentRollNo) &&
      attendance.teacherID.includes(filters.teacherID) &&
      attendance.classID.includes(filters.classID)
    );
  });

  const columns = [
    {
      title: "Student Roll No",
      dataIndex: "studentRollNo",
      key: "studentRollNo",
    },
    {
      title: "Period ID",
      dataIndex: "periodID",
      key: "periodID",
    },
    {
      title: "Teacher ID",
      dataIndex: "teacherID",
      key: "teacherID",
    },
    {
      title: "Class ID",
      dataIndex: "classID",
      key: "classID",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Present",
      dataIndex: "present",
      key: "present",
      render: present => present ? "Yes" : "No"
    }
  ];

  return (
    <div>
      <Input
        placeholder="Student Roll No"
        name="studentRollNo"
        value={filters.studentRollNo}
        onChange={handleFilterChange}
      />
      <Input
        placeholder="Teacher ID"
        name="teacherID"
        value={filters.teacherID}
        onChange={handleFilterChange}
      />
      <Input
        placeholder="Class ID"
        name="classID"
        value={filters.classID}
        onChange={handleFilterChange}
      />
      <Table dataSource={filteredData} columns={columns} />

    </div>
  ) ;
};

export default AttendanceTable;
