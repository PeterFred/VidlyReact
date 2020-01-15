import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  /**
   * A tableCell is rendered from the columns array (in moviesTable)
   * and could be a movie object property OR a function (like / onDelete).
   * renderCell differentiates them and returns a react element (from a function)
   * OR an object property, so that the map function knows which to render
   */
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  /*Creates a new key, deifferentiating between object props (column.path)
   *or functions (column.key) as defined in moviesTable columns[] */
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
