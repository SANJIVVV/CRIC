import './CreateTournament.css';

function TournamentForm() {
  return (
        <><h2 className='title'>CREATE TOURNAMENT</h2><form className='FOOM'>

      <label>TOURNAMENT TITLE:</label>
      <input type="text" name="title" required /><br /><br />

      <label>START DATE:</label>
      <input type="date" name="startDate" required /><br /><br />

      <label>END DATE:</label>
      <input type="date" name="endDate" required /><br /><br />

      <label>MATCH FORMAT:</label>
      <select name="matchFormat">
        <option>20 overs</option>
        <option>50 overs</option>
      </select><br /><br />

      <label>MATCH TYPE:</label>
      <select name="type">
        <option>League</option>
        <option>Knockout</option>
      </select><br /><br />

      <label>Location/Venue:</label>
      <input type="text" name="venue" required /><br /><br />

      <label>Registration Deadline:</label>
      <input type="date" name="registrationDeadline" required  /><br /><br />
      
    </form>
    <button type="submit" className="b1">Create Tournament</button></>
  );
}

export default TournamentForm;