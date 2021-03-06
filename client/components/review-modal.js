import React from 'react'
import { Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap'
import Rating from 'react-rating'

export default class ReviewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRating = this.handleRating.bind(this)
    this.getReviewDate = this.getReviewDate.bind(this)
  }

  getReviewDate() {
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() + 1
    let year = today.getFullYear()

    if (day < 10) day = `0${day}`
    if (month < 10) month = `0${month}`

    today = `${month}/${day}/${year}`

    return today
  }

  handleSubmit(event) {
    event.preventDefault()
    const reviewData = new FormData(event.target)
    const name = reviewData.get('name')
    const email = reviewData.get('email')
    const location = reviewData.get('location')
    const review = reviewData.get('review')
    const date = this.getReviewDate()

    const reviewObj = {
      name: name,
      email: email,
      date: date,
      location: location,
      review: review,
      rating: document.getElementById('rating1').value
    }
    this.props.createReview(reviewObj)
  }

  handleRating(value) {
    const rating = document.getElementById('rating1')
    rating.value = value
  }

  render() {
    return (
      <div>
        <Modal centered isOpen={this.props.isOpen}>
          <ModalHeader className='justify-content-center' onClick={this.props.close}>
            <div className='h3 mb-0'>Leave a Review</div>
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody className='pt-0'>
              <FormGroup>
                <Input id='rating1' type='text' name='rating' style={{display: 'none'}} defaultValue={1} />
              </FormGroup>
              <FormGroup>
                <Label className='d-block'>Rating</Label>
                <Rating
                  emptySymbol='far fa-star fa-2x'
                  fullSymbol='fas fa-star fa-2x'
                  initialRating={1}
                  onChange={this.handleRating} />
              </FormGroup>
              <FormGroup>
                <Label>Name</Label>
                <Input type='text' name='name' required ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type='text' name='email' required ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Location</Label>
                <Input type='text' name='location' required ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Review</Label>
                <Input type='textarea' name='review' required ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter className='py-2'>
              <Button onClick={this.props.toggleReviewModal} className='shadow float-right mr-2' color='danger'>Cancel</Button>
              <Button onSubmit={this.handleSubmit} className='shadow float-right' color='primary'>Submit</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}
