Confirmation = (function () {
  function Confirmation(_options, _callback) {
    var self = this;

    this._callback = _callback;

    this._animate = typeof _options.animate === "undefined" ? true : _options.animate;
    this._debug = typeof _options.debug === "undefined" ? true : _options.debug;

    this._id = new Mongo.ObjectID().toHexString();

    if (this._debug) {
      console.log("creating view");
    }

    this.view = Blaze.renderWithData(Template.popup_confirm, {
      message: _options.message || "",
      title: _options.title || "",
      cancelText: _options.cancelText || "Cancel",
      okText: _options.okText || "Ok",
      success: _options.success,
      _id: this._id
    }, document.body);


    Meteor.setTimeout(function() {
      if (self._debug) {
        console.log("View ready");
      }
      self._init();
    }, 50);


    if (this._debug) {
      console.log(this);
    }

  }

  Confirmation.prototype._init = function () {
    if (this._debug) {
      console.log("pc _init", this);
    }

    this.popup   = $("#" + this._id);

    if(!this.popup) {
      if (this._debug) {
        console.log("pc not really ready yet, wait a bit", this);
      }
      Meteor.setTimeout(function() { this._init(); }, 50);
    }

    this.okButton      = this.popup.find("#pc-ok");
    this.cancelButton  = this.popup.find("#pc-cancel");

    // TODO create a form and listen to submit
    this._okListener = this._okListener.bind(this);
    this._cancelListener = this._cancelListener.bind(this);

    this.okButton.bind('click', this._okListener);
    this.cancelButton.bind('click', this._cancelListener);
  };

  Confirmation.prototype._destroy = function () {
    if (this._debug) {
      console.log("pc _destroy", this);
    }
    Blaze.remove(this.view);
  };

  Confirmation.prototype._hide = function () {
    if (this._debug) {
      console.log("pc _hide", this);
    }
    this.okButton.unbind('click', this._okListener);
    this.cancelButton.unbind('click', this._cancelListener);

    if (this._animate) {
      this._destroy();
    } else {
      var self = this;
      this.popup.addClass('pc-leave');
      setTimeout( function() { self._destroy(); }, 500 );
    }
  };

  Confirmation.prototype._okListener = function () {
    if (this._debug) {
      console.log("pc _ok", this);
    }
    this._hide();
    this._callback(true);
  };

  Confirmation.prototype._cancelListener = function () {
    if (this._debug) {
      console.log("pc _cancel", this);
    }
    this._hide();
    this._callback(false);
  };

  return Confirmation;

})();
