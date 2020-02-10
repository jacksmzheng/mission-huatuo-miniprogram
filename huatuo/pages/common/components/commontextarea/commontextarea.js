Component({
  properties: {
    status:{
      type: String,
      value: '0'
    },
    obj: {
      type: Object,
      value: {
        isMandatory: {
          type: Boolean,
          value: false,
        },
        isDisabled: {
          type: Boolean,
          value: false,
        },
        hasWarning: {
          type: Boolean,
          value: false
        },
        label: {
          type: String,
          value: '',
        },
        placeholder: {
          type: String,
          value: '',
        },
        desc: {
          type: String,
          value: '',
        },
        content: {
          type: String,
          value: '',
        },
        warningLabel: {
          type: String,
          value: '',
        },
        num: {
          type: String,
          value: '0',
        },
        maxlength: {
          type: String,
          value: '200',
        },
        type: {
          type: String,
          value: '',
        },
        bindInputName: {
          type: String,
          value: 'inputEvent',
        }
      }
    }
  },
  data: {
    someData: {}
  },
  methods: {
    focus: function (e) {
      this.setData({status: '1'})
    },
    blur: function (e) {
      this.setData({status: '0'})
    },
    inputEvent: function (e) {
      this.triggerEvent(this.data.obj.bindInputName, { e: e })
    }
  }
})