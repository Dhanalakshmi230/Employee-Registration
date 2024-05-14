import React from 'react';
import './list.css';

// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Added faTrash for delete icon

export default function List() {
  return (
    <div className="mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12"> {/* Adjust column width based on screen size */}
          <div className="table-responsive">
            <table className="table table-dark table-striped">
              <thead className="cf">
                <tr>
                  <th>Code</th>
                  <th>Company</th>
                  <th className="numeric">Price</th>
                  <th className="numeric">Change</th>
                  <th className="numeric">Change %</th>
                  <th className="numeric">Open</th>
                  <th className="numeric">High</th>
                  <th className="numeric">Low</th>
                  <th className="numeric">Volume</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-title="Code">AAC</td>
                  <td data-title="Company">Company Name</td>
                  <td data-title="Price" className="numeric">$100</td>
                  <td data-title="Change" className="numeric">+10</td>
                  <td data-title="Change %" className="numeric">10%</td>
                  <td data-title="Open" className="numeric">110</td>
                  <td data-title="High" className="numeric">120</td>
                  <td data-title="Low" className="numeric">90</td>
                  <td data-title="Volume" className="numeric">1000</td>
                  <td>
                    {/* Action buttons */}
                    <div className="d-flex justify-content-between align-items-center">
                      {/* Edit Button with Font Awesome Icon */}
                      <button className="btn btn-primary mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      
                      {/* Delete Button with Font Awesome Icon */}
                      <button className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Add more rows if needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
