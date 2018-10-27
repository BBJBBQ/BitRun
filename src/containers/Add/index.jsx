import React from 'react'
import Submit from '../../components/Submit'
import BottomNav from '../../components/BottomNav'
import './add.css'
import { transaction, simpleStoreContract } from '../../simpleStore'
import nervos from '../../nervos'

const timeFormatter = time => ('' + time).padStart(2, '0')

const submitTexts = {
  normal: '提交',
  submitting: '保存中',
  submitted: '保存成功',
}

class Add extends React.Component {
  state = {
    text1: '',
    text2: '',
    text3: '',
    time: new Date(),
    submitText: submitTexts.normal,
    errorText: '',
  }
  handleInput1 = e => {
    this.setState({ text1: e.target.value })
  }
  handleInput2 = e => {
    this.setState({ text2: e.target.value })
  }
  handleInput3 = e => {
    this.setState({ text3: e.target.value })
  }
  handleSubmit = e => {
    const { time, text } = this.state
    nervos.appchain
      .getBlockNumber()
      .then(current => {
        const tx = {
          ...transaction,
          validUntilBlock: +current + 88,
        }
        this.setState({
          submitText: submitTexts.submitting,
        })
        return simpleStoreContract.methods.add(text,+time).send(tx)
      })
      .then(res => {
        if (res.hash) {
          return nervos.listeners.listenToTransactionReceipt(res.hash)
        } else {
          throw new Error('No Transaction Hash Received')
        }
      })
      .then(receipt => {
        if (!receipt.errorMessage) {
          this.setState({ submitText: submitTexts.submitted })
        } else {
          throw new Error(receipt.errorMessage)
        }
      })
      .catch(err => {
        this.setState({ errorText: JSON.stringify(err) })
      })
  }
  render() {
    const { time, text, submitText, errorText } = this.state
    return (
      <div className="add__content--container">
        <div className="add__time--container">
          <span className="add__time--year">{time.getFullYear()}</span>
          :
          <span className="add__time--month">{timeFormatter((time.getMonth() + 1) % 12)}</span>
          :
          <span className="add__time--day">{timeFormatter(time.getDate())}</span>
          :
          <span className="add__time--hour">{timeFormatter(time.getHours())}</span>
          :
          <span className="add__time--min">{timeFormatter(time.getMinutes())}</span>
        </div>
        <div className="add__content--prompt">
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-icon-time" />
          </svg>
          <span>请根据指示完成以下操作</span>
        </div>
        <textarea
          cols="32"
          rows="1"
          className="add__content--textarea"
          placeholder="请输入min："
          onChange={this.handleInput1}
          value={this.state.text1}
        />
        <textarea
          cols="32"
          rows="1"
          className="add__content--textarea"
          placeholder="请输入max："
          onChange={this.handleInput2}
          value={this.state.text2}
        />
        <textarea
          cols="32"
          rows="1"
          className="add__content--textarea"
          placeholder="请输入number："
          onChange={this.handleInput3}
          value={this.state.text3}
        />
        <Submit text={submitText} onClick={this.handleSubmit} disabled={submitText !== submitTexts.normal} />
        {errorText && <span className="warning">{errorText}</span>}
        <BottomNav showAdd={false} />
      </div>
    )
  }
}
export default Add
