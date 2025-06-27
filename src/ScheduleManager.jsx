import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Save, Trash2, Pencil } from "lucide-react";

const ScheduleManager = ({ tournamentId }) => {
  const [matches, setMatches] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newMatch, setNewMatch] = useState({
    team1: "",
    team2: "",
    date: "",
    hour: "",
    minute: "",
    ampm: "AM",
    venue: "",
  });

  const storageKey = `schedule_${tournamentId}`;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setMatches(saved);
  }, [storageKey, tournamentId]);

  const formatTime = ({ hour, minute, ampm }) => `${hour}:${minute} ${ampm}`;

  const updateStorage = (updated) => {
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setMatches(updated);
  };

  const handleInputChange = (e, index) => {
    const updated = [...matches];
    const { name, value } = e.target;
    updated[index] = {
      ...updated[index],
      [name]: value,
      time: formatTime({
        hour: name === "hour" ? value : updated[index].hour,
        minute: name === "minute" ? value : updated[index].minute,
        ampm: name === "ampm" ? value : updated[index].ampm,
      })
    };
    setMatches(updated);
  };

  const handleNewMatchChange = (e) => {
    const { name, value } = e.target;
    setNewMatch((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMatch = () => {
    if (newMatch.team1 && newMatch.team2 && newMatch.date && newMatch.hour && newMatch.minute && newMatch.venue) {
      const matchToAdd = { ...newMatch, time: formatTime(newMatch) };
      updateStorage([...matches, matchToAdd]);
      setNewMatch({ team1: "", team2: "", date: "", hour: "", minute: "", ampm: "AM", venue: "" });
    } else alert("Please fill all fields before adding a match.");
  };

  const handleEdit = (index) => {
    const confirmEdit = window.confirm("Are you sure you want to edit this match?");
    if (confirmEdit) {
      setEditingIndex(index);
    }
  };

  const handleSave = () => {
    updateStorage(matches);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this match?");
    if (confirmDelete) {
      updateStorage(matches.filter((_, i) => i !== index));
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(matches);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    updateStorage(items);
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  return (
    <div className="bg-gradient-to-b from-green-100 to-green-50 min-h-screen p-6 font-sans">
      <div className="bg-green-700 rounded-xl text-white py-6 px-4 text-center shadow-lg mb-8">
        <h2 className="text-4xl font-extrabold tracking-wide">
          Schedule Tournament {tournamentId}
        </h2>
        <p className="mt-2 text-green-100">Manage matches, dates, venues and times</p>
      </div>

      <div className="overflow-x-auto max-w-6xl mx-auto rounded-xl shadow-md bg-white">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="matches">
            {(provided) => (
              <table
                className="min-w-full border rounded-xl"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <thead className="bg-green-200 text-green-900">
                  <tr>
                    {[
                      "Team 1",
                      "Team 2",
                      "Match Date",
                      "Venue Name",
                      "Match Time",
                      "Actions"
                    ].map((head) => (
                      <th key={head} className="p-3 border text-sm uppercase tracking-wider text-left">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match, i) => (
                    <Draggable key={i} draggableId={`match-${i}`} index={i}>
                      {(provided) => (
                        <tr
                          className="even:bg-green-50 hover:bg-green-100 transition"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {editingIndex === i ? (
                            <>
                              {["team1", "team2", "date", "venue"].map((field) => (
                                <td key={field} className="p-2 border">
                                  <input
                                    name={field}
                                    value={match[field]}
                                    onChange={(e) => handleInputChange(e, i)}
                                    className="w-full border border-green-300 rounded px-2 py-1"
                                    type={field === "date" ? "date" : "text"}
                                  />
                                </td>
                              ))}
                              <td className="p-2 border">
                                <div className="flex gap-1">
                                  {["hour", "minute", "ampm"].map((timeField) => (
                                    <select
                                      key={timeField}
                                      name={timeField}
                                      value={match[timeField]}
                                      onChange={(e) => handleInputChange(e, i)}
                                      className="border px-2 rounded"
                                    >
                                      {(timeField === "hour" ? hourOptions : timeField === "minute" ? minuteOptions : ["AM", "PM"]).map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </select>
                                  ))}
                                </div>
                              </td>
                              <td className="p-2 border text-center">
                                <button
                                  onClick={() => handleSave(i)}
                                  className="bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700"
                                >
                                  <Save size={16} />
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="p-2 border">{match.team1}</td>
                              <td className="p-2 border">{match.team2}</td>
                              <td className="p-2 border">{match.date}</td>
                              <td className="p-2 border">{match.venue}</td>
                              <td className="p-2 border">{match.time}</td>
                              <td className="p-2 border text-center">
                                <div className="flex justify-center gap-2">
                                  <button
                                    onClick={() => handleEdit(i)}
                                    className="bg-yellow-400 text-white p-2 rounded hover:bg-yellow-500"
                                  >
                                    <Pencil size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(i)}
                                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <tr className="bg-green-100">
                    {["team1", "team2", "date", "venue"].map((field) => (
                      <td key={field} className="p-2 border">
                        <input
                          name={field}
                          value={newMatch[field]}
                          onChange={handleNewMatchChange}
                          className="w-full border border-green-300 rounded px-2 py-1"
                          type={field === "date" ? "date" : "text"}
                        />
                      </td>
                    ))}
                    <td className="p-2 border">
                      <div className="flex gap-1">
                        <select name="hour" value={newMatch.hour} onChange={handleNewMatchChange} className="border px-2 rounded">
                          <option value="">HH</option>
                          {hourOptions.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                        <select name="minute" value={newMatch.minute} onChange={handleNewMatchChange} className="border px-2 rounded">
                          <option value="">MM</option>
                          {minuteOptions.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <select name="ampm" value={newMatch.ampm} onChange={handleNewMatchChange} className="border px-2 rounded">
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={handleAddMatch}
                        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                      >
                        <Plus size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ScheduleManager;