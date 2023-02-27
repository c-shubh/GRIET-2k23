import { Table, Select } from "antd";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Center,
  Heading,
  Spacer,
  Input,
  Tag,
} from "@chakra-ui/react";
import { RotatingLines } from "react-loader-spinner";

const AttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    studentRollNo: "",
    teacherID: "",
    classID: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const req = await fetch("/api/hello");
    const res = await req.json();
    setAttendanceData(res);

    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  console.log(attendanceData);
  const filteredData = attendanceData.filter((attendance) => {
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
      render: (present) =>
        present ? (
          <Tag color="green" key={present}>
            {" "}
            Present
          </Tag>
        ) : (
          <Tag color="red" key={present}>
            Absent
          </Tag>
        ),
    },
  ];

  return (
    <>
      {loading ? (
        <Center display="flex" m="300">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="120"
            visible={true}
          />
        </Center>
      ) : (
        <>
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            background="gray.100"
          >
            <Box
              width="100%"
              maxWidth="900px"
              p="4"
              background="white"
              borderRadius="md"
              boxShadow="md"
            >
              <Flex alignItems="center" gap="4" mb="4">
                <Box p="2">
                  <Heading size="md" color="blue.700">
                    Admin Dashboard
                  </Heading>
                </Box>
                <Spacer />

                <Box>
                  <Input
                    placeholder="Student Roll No"
                    color="black"
                    name="studentRollNo"
                    value={filters.studentRollNo}
                    onChange={handleFilterChange}
                  />
                </Box>
                <Box>
                  <Input
                    placeholder="Teacher ID"
                    name="teacherID"
                    value={filters.teacherID}
                    onChange={handleFilterChange}
                  />
                </Box>
                <Box>
                  <Input
                    placeholder="Class ID"
                    name="classID"
                    value={filters.classID}
                    onChange={handleFilterChange}
                  />
                </Box>
              </Flex>
              <Table dataSource={filteredData} columns={columns} />
            </Box>
          </Flex>
        </>
      )}
    </>
  );
};

export default AttendanceTable;
