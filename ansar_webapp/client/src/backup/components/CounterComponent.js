import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/simpleStore';

const CounterComponent = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <h2>Redux Counter Example</h2>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default CounterComponent; 