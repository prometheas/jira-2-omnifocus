import React from 'react';

class ExtensionOptions extends React.Component {
  state = {
    useMailDrop: false
  }

  render() {
    return (
      <div>
        <label htmlFor="use-maildrop">
          <input
            type="checkbox"
            name="use-maildrop"
            checked={this.state.useMailDrop}
          />
          Use Mail Drop
        </label>

        <input
          type="text"
          name="maildrop-address"
          placeholder="your-address"
          pattern="^\w+$"
        />
        @sync.omnigroup.com

        <section id="buttons">
          <button>Reset</button>
          <button>Save</button>
          <span className="status" />
        </section>
      </div>
    );
  }
}
