import React from 'react'
import { Col,
  FormGroup,
  Label,
  Input } from 'reactstrap'

export default function GasMileageRadios(props) {
  return (
    <Col xl='4'>
      <FormGroup className='px-5'>
        <Label check>
          <Input
            type='radio'
            name='type'
            value={props.value}
            required/>
          <img className='w-100' src={props.icon} />
          Car
        </Label>
      </FormGroup>
    </Col>
  )
}
