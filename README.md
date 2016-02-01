A clean and easy to use confirmation popup

Installation
============

    $ meteor add matdutour:popup-confirm

Usage
=====


	new Confirmation({
      message: "Are you sure ?",
      title: "Confirmation",
      cancelText: "Cancel",
      okText: "Ok",
      success: true, // whether the button should be green or red
      focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
    }, function (ok) {
      // ok is true if the user clicked on "ok", false otherwise
    });
