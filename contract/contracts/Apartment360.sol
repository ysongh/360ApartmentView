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
        "number_of_rooms text,"
        "location text,"
        "price text,"
        "isShow integer",
        _TABLE_PREFIX
      )
    );
  }

  function addApt(string memory aptURL, string memory dataURL, string memory numberOfRooms, string memory location, string memory price) public payable {
    TablelandDeployments.get().mutate(
        address(this),
        tableId,
        SQLHelpers.toInsert(
        _TABLE_PREFIX,
        tableId,
        "id,apt_url,data_url,number_of_rooms,location,price,isShow",
        string.concat(
            Strings.toString(dataCount), // Convert to a string
            ",",
            SQLHelpers.quote(aptURL), // Wrap strings in single quotes
            ",",
            SQLHelpers.quote(dataURL),
            ",",
            SQLHelpers.quote(numberOfRooms),
            ",",
            SQLHelpers.quote(location),
            ",",
            SQLHelpers.quote(price),
            ",",
            SQLHelpers.quote(Strings.toString(1))
          )
        )
    );

    dataCount++;
  }

  function getTableName() external view returns (string memory) {
    return SQLHelpers.toNameFromId(_TABLE_PREFIX, tableId);
  }
}