import React from 'react';
import Server from './server'


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			questions: [],
			currentQuestion: 0,
			setCurrentQuestion: 0,
			score: 0,
			setScore: 0,
			showScore: false
		}
	}



	async componentDidMount(){

		let quiz = (new URLSearchParams(window.location.search)).get("quiz")
		if (quiz == null) quiz = "Math"
		await Server.getQuestions(quiz).then((graphqlObj) => {
			const q = graphqlObj.data.getQuestions
			this.setState({
				questions: q
			});

			console.log(this.state.questions)
		})
	}

	handleAnswerOptionClick(isCorrect) {
		if (isCorrect) {
			this.setScore(this.state.score + 1);
		}

		const nextQuestion = this.state.currentQuestion + 1;
		if (nextQuestion < this.state.questions.length) {
			this.setCurrentQuestion(nextQuestion);
		} else {
			this.setShowScore(true);
		}
	}

	setCurrentQuestion(val){
		this.setState({
			currentQuestion: val
		});
	}

	setShowScore(val) {
		this.setState({
			showScore: val
		});
	}

	setScore(val){
		this.setState({
			score: val
		});
	}

	render() {
		return (<div>
			{this.state.questions.length > 0 &&
				<div className='app'>
					{this.state.showScore ? (
						<div className='score-section'>
							You scored {this.state.score} out of {this.state.questions.length}
						</div>
					) : (
						<>
							<div className='question-section'>
								<div className='question-count'>
									<span>Question {this.state.currentQuestion + 1}</span>/{this.state.questions.length}
								</div>
								<div className='question-text'>{this.state.questions[this.state.currentQuestion].text}</div>
							</div>
							<div className='answer-section'>
								{this.state.questions[this.state.currentQuestion].choice.map((answerOption) => (
									<button onClick={() => this.handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.text}</button>
								))}
							</div>
						</>
					)}
				</div>
			}
		</div>)
	}
}

export default App;

// export default function App() {
// 	let questions = [];
// 	useComponentWillMount(() => this.questions = Server.getQuestions("Math"));
// 	useComponentDidMount(() => console.log("didMount"));

// 	const [currentQuestion, setCurrentQuestion] = useState(0);
// 	const [showScore, setShowScore] = useState(false);
// 	const [score, setScore] = useState(0);

// 	const handleAnswerOptionClick = (isCorrect) => {
// 		if (isCorrect) {
// 			setScore(score + 1);
// 		}

// 		const nextQuestion = currentQuestion + 1;
// 		if (nextQuestion < questions.length) {
// 			setCurrentQuestion(nextQuestion);
// 		} else {
// 			setShowScore(true);
// 		}
// 	};


// 	return (

// 	);
// }

// const useComponentWillMount = func => {
// 	const willMount = useRef(true);
// 	if (willMount.current) {
// 		func();
// 	}
// 	useComponentDidMount(() => {
// 		willMount.current = false;
// 	});
// };

// const useComponentDidMount = func => useEffect(func, []);