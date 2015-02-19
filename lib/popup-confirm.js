Confirmation = (function () {
  function Confirmation(_options, _callback) {
    var self = this;

    this._callback = _callback;

    this._id = new Mongo.ObjectID().toHexString();

    this.view = Blaze.renderWithData(Template.popup_confirm, {
      message: _options.message || "",
      title: _options.title || "",
      cancelText: _options.cancelText || "Cancel",
      okText: _options.okText || "Ok",
      success: _options.success,
      _id: this._id
    }, document.body);


    Meteor.setTimeout(function() {self._init();}, 50);

  }

  Confirmation.prototype._init = function () {
    this.popup   = $("#" + this._id);

    if(!this.popup) {
      var self = this;
      Meteor.setTimeout(function() { self._init(); }, 50);
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
    Blaze.remove(this.view);
  };

  Confirmation.prototype._hide = function () {
    this.okButton.unbind('click', this._okListener);
    this.cancelButton.unbind('click', this._cancelListener);

    var self = this;
    this.popup.addClass('pc-leave');
    Meteor.setTimeout( function() { self._destroy(); }, 500 );
  };

  Confirmation.prototype._okListener = function () {
    this._hide();
    this._callback(true);
  };

  Confirmation.prototype._cancelListener = function () {
    this._hide();
    this._callback(false);
  };

  return Confirmation;

})();
