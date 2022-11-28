@detrenasama/modal-hooker
=========================

[![NPM version][npm-image]][npm-url]

[npm-image]: https://img.shields.io/badge/npm-1.0.0-blue
[npm-url]: https://npmjs.org/package/address

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

### Using custom modal container

Pass it to ModalProvider for using as default container or pass to 
hook for using it when needed

```js

<ModalProvider DefaultModalComponent={CustomModalContainer}>

useModal(MyModal, {}, CustomModalContainer)
```

See example in sources

## License

[MIT](LICENSE.txt)
