import React from 'react';
import PropTypes from 'prop-types';

import authData from '../../helpers/data/authData';

import './PinForm.scss';


class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    saveNewPin: PropTypes.func.isRequired,
    putPin: PropTypes.func.isRequired,
    pin: PropTypes.object.isRequired,
  }

  state = {
    pinTitle: '',
    pinImageUrl: '',
    isEditing: false,
  }

  componentDidMount() {
    const { pin } = this.props;
    if (pin.title) {
      this.setState({ pinTitle: pin.title, pinImageUrl: pin.imageUrl, isEditing: true });
    }
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePin = (e) => {
    e.preventDefault();
    const { pinTitle, pinImageUrl } = this.state;
    const { boardId, saveNewPin } = this.props;
    const newPin = {
      boardId,
      imageUrl: pinImageUrl,
      title: pinTitle,
      uid: authData.getUid(),
    };
    saveNewPin(newPin);
  }

  updatePin = (e) => {
    e.preventDefault();
    const { pinImageUrl, pinTitle } = this.state;
    const { boardId, putPin, pin } = this.props;
    const updatedPin = {
      boardId,
      imageUrl: pinImageUrl,
      title: pinTitle,
      uid: authData.getUid(),
    };
    putPin(pin.id, updatedPin);
  }

  render() {
    const { pinTitle, pinImageUrl, isEditing } = this.state;
    return (
      <div className="PinForm">
                <form className="col-6 offset-3 bg-light p-3">
           <div className="form-group">
            <label htmlFor="pin-title">Title</label>
            <input
            type="text"
            className="form-control"
            id="pin-title"
            placeholder="Name your pin"
            value={pinTitle}
            onChange={this.titleChange}/>
          </div>
           <div className="form-group">
            <label htmlFor="pin-image">Image URL</label>
            <input
            type="text"
            className="form-control"
            id="pin-image"
            placeholder="image url"
            value={pinImageUrl}
            onChange={this.imageUrlChange}/>
         </div>
         {
           isEditing
             ? <button className="btn btn-dark" onClick={this.updatePin}>Update Pin</button>
             : <button className="btn btn-dark" onClick={this.savePin}>Save Pin</button>
         }
        </form>
      </div>
    );
  }
}

export default PinForm;
