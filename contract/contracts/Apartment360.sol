// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Apartment360 is ERC721Holder {
  uint256 public tableId;
  string private constant _TABLE_PREFIX = "my_hardhat_table";
  uint256 public dataCount = 1;

  // Add a constructor that creates and inserts data
  constructor() {
    tableId = TablelandDeployments.get().create(
      address(this),
      SQLHelpers.toCreateFromSchema(
        "id integer primary key," // Notice the trailing comma
        "apt_url text,"
        "data_url text,"
        "number_of_rooms integer,"
        "location text,"
        "price integer,"
        "is_show integer",
        _TABLE_PREFIX
      )
    );
  }

  function addApt(string memory aptURL, string memory dataURL, uint256 numberOfRooms, string memory location, uint256 price) public payable {
    TablelandDeployments.get().mutate(
        address(this),
        tableId,
        SQLHelpers.toInsert(
        _TABLE_PREFIX,
        tableId,
        "id,apt_url,data_url,number_of_rooms,location,price,is_show",
        string.concat(
            Strings.toString(dataCount), // Convert to a string
            ",",
            SQLHelpers.quote(aptURL), // Wrap strings in single quotes
            ",",
            SQLHelpers.quote(dataURL),
            ",",
            SQLHelpers.quote(Strings.toString(numberOfRooms)),
            ",",
            SQLHelpers.quote(location),
            ",",
            SQLHelpers.quote(Strings.toString(price)),
            ",",
            SQLHelpers.quote(Strings.toString(1))
          )
        )
    );

    dataCount++;
  }

  // Update data in the table
  function setNoShow(uint256 id) public payable {
    // Set values to update, like the "val" column to the function input param
    string memory setters = string.concat(
      "is_show=",
      SQLHelpers.quote(Strings.toString(0)) // Wrap strings in single quotes
    );
    // Only update the row with the matching `id`
    string memory filters = string.concat(
      "id=",
      Strings.toString(id)
    );
    /*  Under the hood, SQL helpers formulates:
    *
    *  UPDATE {prefix}_{chainId}_{tableId} SET val=<myVal> WHERE id=<id>
    */
    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toUpdate(
        _TABLE_PREFIX,
        tableId,
        setters,
        filters
      )
    );
  }

  function getTableName() external view returns (string memory) {
    return SQLHelpers.toNameFromId(_TABLE_PREFIX, tableId);
  }
}