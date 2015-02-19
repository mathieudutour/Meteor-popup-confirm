Confirmation = (function () {
  function Confirmation(_options, _callback) {
    var self = this;

    this._callback = _callback;

    this._animate = typeof _options.animate === "undefined" ? true : _options.animate;

    this.view = Blaze.renderWithData(Template.popup_confirm, {
      message: _options.message || "",
      title: _options.title || "",
      cancelText: _options.cancelText || "Cancel",
      okText: _options.okText || "Ok"
    }, UI.body);
    this.templateInstance = this.view.templateInstance();

    this._okListener = this._okListener.bind(this);
    this._cancelListener = this._cancelListener.bind(this);

    this.view.onViewReady(function() {
      self._init();
    });

  }

  Confirmation.prototype._init = function () {
    this.popup   = this.templateInstance.findOne(".pc-container");
    this.ok      = this.templateInstance.findOne("#pc-ok");
    this.cancel  = this.templateInstance.findOne("#pc-cancel");

    this.ok.addEventListener('click', this._okListener);
    this.cancel.addEventListener('click', this._cancelListener);
  };

  Confirmation.prototype._destroy = function () {
    Blaze.remove(this.view);
  };

  Confirmation.prototype._hide = function () {
    this.ok.removeEventListener('click', this._okListener);
    this.cancel.removeEventListener('click', this._cancelListener);
    if (this._animate) {
      Meteor.setTimeout( function() { this._destroy(); }, 500 );
    } else {
      $(this.popup).addClass('leave');
      Meteor.setTimeout( function() { this._destroy(); }, 500 );
    }
  };

  Confirmation.prototype._okListener = function () {
    this._hide();
    this.callback(true);
  };

  Confirmation.prototype._cancelListener = function () {
    this._hide();
    this.callback(true);
  };

  return Confirmation;

})();
