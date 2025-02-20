import { Link } from 'react-router-dom';

// user goal page, should display current goals and allow them to create or delete goals

function UserGoals () {
    return (
        <div>
          <h2>My Goals</h2>
          <hr/>
          <p>Example Goal 1: Exercise every day</p>
          <hr/>
          <p>Example Goal 2: Improve benchpress pr</p>
          <hr/>
          <Link to="./newGoal" className="button-link">Create New Goal</Link>
          <br></br>
          <Link to="/" className="button-link">Home</Link>
        </div>
      );
}

export default UserGoals