Confirmation = (function () {
  function Confirmation(_options, _callback) {
    var self = this;

    this._callback = _callback;

    this._animate = typeof _options.animate === "undefined" ? true : _options.animate;
    this._debug = typeof _options.debug === "undefined" ? true : _options.debug;

    if (this._debug) {
      console.log("creating view");
    }

    this.view = Blaze.renderWithData(Template.popup_confirm, {
      message: _options.message || "",
      title: _options.title || "",
      cancelText: _options.cancelText || "Cancel",
      okText: _options.okText || "Ok",
      success: _options.success
    }, document.body);

    this.view.onViewCreated(function () {
      if (this._debug) {
        console.log("view created");
      }
      Tracker.flush();

      Meteor.setTimeout(function() {
        self.view = this;
        if (self._debug) {
          console.log("View ready");
        }
        self.templateInstance = this.templateInstance();
        self._init();
      }, 50);

    });

    if (this._debug) {
      console.log(this);
    }

  }

  Confirmation.prototype._init = function () {
    if (this._debug) {
      console.log("pc _init", this);
    }
    this.popup   = this.templateInstance.findOne(".pc-container");
    this.okButton      = this.templateInstance.findOne("#pc-ok");
    this.cancelButton  = this.templateInstance.findOne("#pc-cancel");

    if(!this.popup || !this.okButton || !this.cancelButton) {
      if (this._debug) {
        console.log("pc not really ready yet, wait a bit", this);
      }
      Meteor.setTimeout(function() { this._init(); }, 50);
    }

    this._okListener = this._okListener.bind(this);
    this._cancelListener = this._cancelListener.bind(this);

    this.okButton.addEventListener('click', this._okListener);
    this.cancelButton.addEventListener('click', this._cancelListener);
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
    this.okButton.removeEventListener('click', this._okListener);
    this.cancelButton.removeEventListener('click', this._cancelListener);
    if (this._animate) {
      Meteor.setTimeout( function() { this._destroy(); }, 500 );
    } else {
      $(this.popup).addClass('pc-leave');
      Meteor.setTimeout( function() { this._destroy(); }, 500 );
    }
  };

  Confirmation.prototype._okListener = function () {
    if (this._debug) {
      console.log("pc _ok", this);
    }
    this._hide();
    this.callback(true);
  };

  Confirmation.prototype._cancelListener = function () {
    if (this._debug) {
      console.log("pc _cancel", this);
    }
    this._hide();
    this.callback(true);
  };

  return Confirmation;

})();
