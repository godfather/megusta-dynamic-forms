import Form from "./components/Form/Form";
import FormContextPorvider from "./store/form-context";

function App() {
    return (
        <FormContextPorvider>
            <div className="App">
                <Form formId="1" />
            </div>
        </FormContextPorvider>
    );
}

export default App;
