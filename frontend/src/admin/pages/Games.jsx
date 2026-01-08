import { useEffect, useState } from "react";
import {
  getGames,
  createGame,
  updateGame,
  deleteGame
} from "../../services/adminGames";

export default function Games() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    code: "",
    active: true,
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await getGames();
    setGames(res.data.data);
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateGame(editId, form);
    } else {
      await createGame(form);
    }

    setForm({ name: "", slug: "", code: "", active: true });
    setEditId(null);
    load();
  };

  const edit = (g) => {
    setEditId(g.id);
    setForm({
      name: g.name,
      slug: g.slug,
      code: g.code,
      active: g.active,
    });
  };

  const remove = async (id) => {
    if (!confirm("Hapus game ini?")) return;
    await deleteGame(id);
    load();
  };

  return (
    <>
      <h1>CRUD Games</h1>

      {/* FORM */}
      <form onSubmit={submit}>
        <input
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          placeholder="Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <label>
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              setForm({ ...form, active: e.target.checked })
            }
          />
          Aktif
        </label>

        <button type="submit">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Slug</th>
            <th>Code</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {games.map((g) => (
            <tr key={g.id}>
              <td>{g.name}</td>
              <td>{g.slug}</td>
              <td>{g.code}</td>
              <td>{g.active ? "Aktif" : "Nonaktif"}</td>
              <td>
                <button onClick={() => edit(g)}>Edit</button>
                <button onClick={() => remove(g.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
