// for undo, redo.
quill.keyboard.addBinding({ key: 'Z', ctrlKey: true }, () => quill.history.undo());
quill.keyboard.addBinding({ key: 'Y', ctrlKey: true }, () => quill.history.redo());