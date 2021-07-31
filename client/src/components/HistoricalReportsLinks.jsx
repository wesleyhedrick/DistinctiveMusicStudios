import { useEffect, useState } from 'react'
import axios from 'axios'
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap'

function HistoricalReportsLinks({ entity }) {
    const pastReports = Array.from({ length: 5 }, (_, i) => i)
    const [reportData, setReportData] = useState([])

    async function getReportDates(entity) {
        console.log('getReportDates ran')
        console.log('entity', entity)
        if (entity == "admin") {
            //Get all reports and order them by teacher
            const { data: adminReportData } = await axios.get(`/api/reports/admin`)
            console.log('adminReportData', adminReportData)
            setReportData(adminReportData)
            return adminReportData
        } else {
            //Get reports of that teacher only
            // await axios.get()
        }
    }


    useEffect(() => {
        getReportDates('admin')
        console.log('reportData', reportData)
    }, [])

    console.log('reportData', reportData)
    const teacherNames = Object.keys(reportData)
    console.log('teacherNames', teacherNames)

    return (

        <>
            <Container mg="0">
                {teacherNames.map((teacher, idx) =>
                    <Row key={idx}>
                        <Col>
                            <Accordion  >
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        {teacher}

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {reportData[teacher][0]}

                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>

                )}

            </Container>
        </>
    )



}

export default HistoricalReportsLinks