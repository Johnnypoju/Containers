import { render, screen } from '@testing-library/react'
import List from '../Todos/List'

const todos = [
    {id: "1", text: "testing", done: false}, {id: "1", text: "2nd test row", done: true}
]


test('render todo', () => {
    render(<List todos={todos} />)
    const listElement = screen.getByText(/testing/i);
    console.log(listElement);
    expect(listElement).toBeInTheDocument();
})