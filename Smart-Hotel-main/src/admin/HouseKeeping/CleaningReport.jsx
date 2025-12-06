import React, { useState } from "react";
import "./CleaningReport.css";

const initialData = [
  { id: "01", emp_name: "Jimmy", complete: 0, pending: 1, under_process: 0 },
  { id: "02", emp_name: "Depa", complete: 0, pending: 0, under_process: 0 },
  { id: "03", emp_name: "Moxi", complete: 1, pending: 1, under_process: 1 },
  { id: "04", emp_name: "Axa", complete: 0, pending: 0, under_process: 0 },
  { id: "05", emp_name: "Hiro", complete: 0, pending: 0, under_process: 0 },
  { id: "06", emp_name: "JOrdan", complete: 1, pending: 1, under_process: 0 },
  { id: "07", emp_name: "Meta", complete: 0, pending: 1, under_process: 0 },
  { id: "08", emp_name: "Heta", complete: 1, pending: 0, under_process: 1 },
  { id: "09", emp_name: "Mozo", complete: 3, pending: 0, under_process: 0 },
];

const pageSizes = [5, 10, 25, 50];

export default function CleaningReport() {
  const [data] = useState(initialData);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // Filtered and paginated data
  const filtered = data.filter(
    row =>
      row.emp_name.toLowerCase().includes(search.toLowerCase()) ||
      row.id.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / entries);
  const paginated = filtered.slice((page - 1) * entries, page * entries);

  return (
    <div className="cleaning-report-page">
      <h2>Cleaning Report</h2>
      <div className="cr-controls">
        <div>
          Show{" "}
          <select value={entries} onChange={e => { setEntries(Number(e.target.value)); setPage(1); }}>
            {pageSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>{" "}
          entries
        </div>
        <div>
          Search:{" "}
          <input
            className="cr-search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by Emp. Name or Id"
          />
        </div>
      </div>
      <div className="cr-table-container">
        <table className="cr-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Emp. Name</th>
              <th>Complete</th>
              <th>Pending</th>
              <th>Under Process</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "#aaa" }}>No entries found.</td>
              </tr>
            ) : paginated.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.emp_name}</td>
                <td>{row.complete}</td>
                <td>{row.pending}</td>
                <td>{row.under_process}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cr-footer">
        <div>
          Showing {(filtered.length === 0 ? 0 : (page - 1) * entries + 1)} to {Math.min(page * entries, filtered.length)} of {filtered.length} entries
        </div>
        <div className="cr-pagination">
          <button
            className="cr-pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>{page}</span>
          <button
            className="cr-pagination-btn"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
