import Form from "./components/Form/Form";
import FormContextPorvider from "./store/form-context";

const App: React.FC<{formId: string }> = ({ formId }) => {
    return (
        <FormContextPorvider>
            <div className="App">
                <Form formId={formId} />
            </div>
        </FormContextPorvider>
    );
}

export default App;
