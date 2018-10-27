import React from 'react'
import { Link } from 'react-router-dom'
import BottomNav from '../../components/BottomNav'
import { simpleStoreContract } from '../../simpleStore'
import nervos from '../../nervos'
require('./list.css')
var arr1 = [
  <h1><this className="handleInput1 state text1"></this></h1>,
  <h2><this className="handleInput2 state text2"></this></h2>,
  <h3><this className="handleInput3 state text3"></this></h3>,
];
const Record = ({ time, arr1, hasYearLabel }) => {
  const _time = new Date(+time)
  return (
    <div className="list__record--container">
      {hasYearLabel ? <div className="list__record--year">{_time.getFullYear()}</div> : null}
      <span>{`${_time.getMonth() + 1}-${_time.getDate()} ${_time.getHours()}:${_time.getMinutes()}`}</span>
      <Link to={`/show/${time}`}>
        <div>{arr1}</div>
      </Link>
    </div>
  )
}

class List extends React.Component {
  state = {
    times: [],
    texts: [],
  }
  componentDidMount() {
    const from = nervos.appchain.accounts.wallet[0] ? nervos.appchain.accounts.wallet[0].address : ''
    simpleStoreContract.methods
      .getList()
      .call({
        from,
      })
      .then(times => {
        times.reverse()
        this.setState({ times })
        return Promise.all(times.map(time => simpleStoreContract.methods.get(time).call({ from })))
      })
      .then(arr1 => {
        this.setState({ arr1 })
      })
      .catch(console.error)
  }
  render() {
    const { times, texts } = this.state
    return (
      <div className="list__record--page">
        {times.map((time, idx) => (
          <Record
            time={time}
            text={texts[idx]}
            key={time}
            hasYearLabel={idx === 0 || new Date(+time).getFullYear() !== new Date(+times[idx - 1]).getFullYear()}
          />
        ))}
        <BottomNav active={'list'} />
      </div>
    )
  }
}
export default List
