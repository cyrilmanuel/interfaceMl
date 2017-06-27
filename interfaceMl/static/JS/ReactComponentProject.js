/**
 * Created by cyriljeanneret on 14.06.17.
 */

class ButtonList extends React.Component {
    constructor(props) {
        super(props);
        this.dataClassifier = this.props.dataClassifier;
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        window.addShape(event.target.id, this.props.dataClassifier[event.target.id]);
    }

    render() {
        let rows = Object.keys(this.dataClassifier).map(name => {
            return (
                <a className="collection-item" onClick={this.onClick} id={name}
                   key={name}>{name}</a>
            );
        });
        return (
            <div className="collection">{rows}</div>
        );
    }
}
;

window.shareRenderButtonList = function (dataClassifier) {
    ReactDOM.render(
        <ButtonList dataClassifier={dataClassifier}/>,
        document.getElementById('classifier')
    );
};

// ------------------------------------------- Show Form ---------------------------------------

class Formul extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.idShape = this.props.idShape;
        this.state = this.props.dict; // trick replace state dict by dict params clasifier
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        window.updateShapeParam(this.idShape, this.state);
        Materialize.toast('Updated parameters of ' + this.name, 2000, 'rounded');
    }

    handleDelete(event) {
        if (confirm('Are you sure you want to remove the shape ' + this.name + '?')) {
            window.removeShape(this.idShape);
            Materialize.toast(this.name + ' removed !', 2000, 'rounded');
        }

        event.preventDefault();
    }

    render() {
        return (
            <form key="formParams">
                <div className="row">
                    <div className="col s12">
                        <a className="waves-effect waves-light btn" name="Delete" onClick={this.handleDelete}
                           key="Delete">Delete Shape</a>
                    </div>
                </div>
                {Object.keys(this.state).map(name => {
                    return (
                        <label key={'label' + name}> {name}
                            <input type="text" name={name} value={this.state[name]} onChange={this.handleChange}
                                   placeholder={this.state[name]} key={name}/>
                        </label>
                    );
                })}
            </form>
        );
    }
}
;


window.shareRenderFormShape = function (dictParamsClassifier, nameClassifier, idShape) {
    ReactDOM.render(
        <Formul dict={dictParamsClassifier} name={nameClassifier} idShape={idShape}/>,
        document.getElementById('formClassificator')
    );
};

window.shareRenderInitFormulaireShape = function () {
    ReactDOM.render(
        <div></div>,
        document.getElementById('formClassificator')
    );
};
// ------------------------ RENDER RETURN RESULT OF JSON -----------------------

class ResultDiv extends React.Component {
    render() {
        let dict = this.props.dict || {};
        let result = Object.keys(dict).map(name => {
                return (
                    <div key={name}>id of the shape = {name} {dict[name]}
                    </div>
                );
            }
        );
        return (
            <div key={2}>{result}</div>
        );
    }
}
;

window.shareRenderResult = function (DictResultPost) {

    ReactDOM.render(
        <ResultDiv dict={DictResultPost}/>,
        document.getElementById('response')
    );
};