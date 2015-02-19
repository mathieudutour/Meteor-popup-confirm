A clean and easy to use confirmation popup

Installation
============

    $ meteor add matdutour:popup-confirm

Usage
=====


	Confirmation({
      message: "Are you sure ?",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
    });
