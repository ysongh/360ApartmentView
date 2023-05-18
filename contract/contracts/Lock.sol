// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock is ERC721Holder {
  uint256 public tableId;
  string private constant _TABLE_PREFIX = "my_hardhat_table";
  uint256 public dataCount = 1;

 // Add a constructor that creates and inserts data
  constructor() {
    tableId = TablelandDeployments.get().create(
      address(this),
      SQLHelpers.toCreateFromSchema(
        "id integer primary key," // Notice the trailing comma
        "val text",
        _TABLE_PREFIX
      )
    );

    TablelandDeployments.get().mutate(
      address(this),
      tableId,
      SQLHelpers.toInsert(
        _TABLE_PREFIX,
        tableId,
        "id,val",
        string.concat(
          Strings.toString(dataCount), // Convert to a string
          ",",
          SQLHelpers.quote("Test Tables") // Wrap strings in single quotes with the `quote` method
        )
      )
    );

    dataCount++;
  }

    // Insert data into a table
    function insert(string memory val) public payable {
        /*  Under the hood, SQL helpers formulates:
        *
        *  INSERT INTO {prefix}_{chainId}_{tableId} (id,val) VALUES(
        *    1
        *    'msg.sender'
        *  );
        */
        TablelandDeployments.get().mutate(
            address(this),
            tableId,
            SQLHelpers.toInsert(
            _TABLE_PREFIX,
            tableId,
            "id,val",
            string.concat(
                Strings.toString(dataCount), // Convert to a string
                ",",
                SQLHelpers.quote(val) // Wrap strings in single quotes
              )
            )
        );

        dataCount++;
    }
}