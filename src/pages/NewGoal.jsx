import { Link } from 'react-router-dom';

// form for creating a new goal, could maybe be integrated onto the same page as goals?


function NewGoal () {
    return (
        <div>
          <h2>Create new Goal</h2>
          Goal: <input goal="mygoal"/>
          <br></br>
          <p>
            Frequency:
            <label>
              <input type="radio" name="frequencyRadio" value="daily" />
              Daily
            </label>
            <label>
              <input type="radio" name="frequencyRadio" value="everyOther" />
              Every other day
            </label>
            <label>
              <input type="radio" name="frequencyRadio" value="weekly" />
              Weekly
            </label>
            <label>
              <input type="radio" name="frequencyRadio" value="monthly" />
              Monthly
            </label>
            <label>
              <input type="radio" name="frequencyRadio" value="notApplicable" />
              Not Applicable
            </label>
          </p>
          <br></br>
          <Link to="../userGoals" className="button-link">Cancel</Link>
        </div>
      );
}

export default NewGoal