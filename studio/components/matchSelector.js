import PropTypes from 'prop-types'
import React from 'react'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import RadioButton from 'part:@sanity/components/radiobutton/default'
import {setIfMissing} from 'part:@sanity/form-builder/patch-event'
// FormBuilderInput automatically generates fields from a schema
import {FormBuilderInput, withDocument} from 'part:@sanity/form-builder'

class matchSelector extends React.PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string
    }),
    focusPath: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    const {document} = this.props
    let activeTypeDefault = false

    if (document && document.match && document.match.teamGame) {
      activeTypeDefault = 'teamGame'
    } else if (document && document.match && document.match.twoPlayer) {
      activeTypeDefault = 'twoPlayer'
    } else if (document && document.match && document.match.freeForAll) {
      activeTypeDefault = 'freeForAll'
    }

    this.state = {
      activeType: activeTypeDefault || 'twoPlayer',
      selected: activeTypeDefault
    }

    console.log(this.props)

    this.handleRadioChange = this.handleRadioChange.bind(this)
  }

  firstFieldInput = React.createRef()

  handleFieldChange = (field, fieldPatchEvent) => {
    const {onChange, type} = this.props
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    console.log(field, fieldPatchEvent)
    onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name})))
  }

  handleRadioChange = e => {
    this.setState({
      activeType: e.title,
      selected: true
    })
  }

  focus () {
    this.firstFieldInput.current.focus()
  }

  render () {
    const {document, type, value, level, focusPath, onFocus, onBlur} = this.props
    const {condition = false} = document
    const {activeType, selected} = this.state

    return (
      <Fieldset level={level} legend={type.title} description={type.description}>
        <RadioButton
          label={'1v1'}
          item={{
            title: 'twoPlayer'
          }}
          checked={selected && activeType === 'twoPlayer'}
          onChange={e => this.handleRadioChange(e)}
        />
        <div style={{
          marginTop: '10px'
        }}>
          <RadioButton
            label={'Team Game'}
            checked={selected && activeType === 'teamGame'}
            onChange={e => this.handleRadioChange(e)}
            item={{
              title: 'teamGame'
            }}
          />
        </div>
        <div style={{
          marginTop: '10px',
          marginBottom: '40px'
        }}>
          <RadioButton
            label={'Free for all'}
            checked={selected && activeType === 'freeForAll'}
            onChange={e => this.handleRadioChange(e)}
            item={{
              title: 'freeForAll'
            }}
          />
        </div>
        <div>
          {type.fields
            .filter(field => (field.name !== activeType ? condition : true))
            .map((field, i) => (
              <div style={{
                display: selected ? 'block' : 'none'
              }}>
                <FormBuilderInput
                  level={level + 1}
                  ref={i === 0 ? this.firstFieldInput : null}
                  key={field.name}
                  type={field.type}
                  value={value && value[field.name]}
                  onChange={patchEvent => this.handleFieldChange(field, patchEvent)}
                  path={[field.name]}
                  focusPath={focusPath}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            ))}
        </div>
      </Fieldset>
    )
  }
}

export default withDocument(matchSelector)
