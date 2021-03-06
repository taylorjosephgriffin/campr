import React from 'react'
import { Col, Row, Progress } from 'reactstrap'

export default function Stepper(props) {

  return (
    <div className='pt-5'>
      <Row className='justify-content-center m-0'>
        <Col xl='6' lg='8' style={{transform: 'translateY(10vh)'}}>
          <Progress multi className='bg-white'>
            <Progress bar value={props.step.confirm}><span className='h4 m-0 text-white'>Confirm</span></Progress>
            <Progress bar value={props.step.payment}><span className='h4 m-0 text-white'>Payment</span></Progress>
          </Progress>
        </Col>
      </Row>
    </div>
  )
}
