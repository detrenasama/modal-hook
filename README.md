@detrenasama/modal-hooker
=========================

Control your modals with hook

## Install

```bash
$ npm install @detrenasama/modal-hooker
```

## Usage

### Wrap your application into ModalProvider

```js

<ModalProvider>
    <App />
</ModalProvider>

```

### Create modal content component

```js

function MyModal({title, onClose}) {
    return <div>
        <h3>{title}</h3>
        <button onClick={onClose}>Close</button>
    </div>
}

```

### Use modal into component where you need it

```js

function MyPageOrSomething() {
    const [openModal, closeModal] = useModal(MyModal, {
        title: "My title",
        onClose: () => {
            closeModal()
        }
    })
    
    return <div>
        <button onClick={openModal}>Open modal</button>
    </div>
}

```


## License

[MIT](LICENSE.txt)
