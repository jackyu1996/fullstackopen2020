import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const mockHandler = jest.fn();

  const blog = {
    _id: '2a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5fc0ea5ed0ecba81bdcb7277',
    __v: 0,
  };

  beforeEach(() => {
    component = render(
      <Blog blog={blog} addLike={mockHandler}/>
    );
  });

  test('renders title and author by default', () => {
    const blogDiv = component.container.querySelector('.blogDiv');

    expect(blogDiv).toHaveTextContent('React patterns');
    expect(blogDiv).toHaveTextContent('Michael Chan');

    const hiddenDiv = component.container.querySelector('.blogDiv > div');
    expect(hiddenDiv).toHaveStyle('display: none');
  });

  test('renders url and like after click', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const hiddenDiv = component.container.querySelector('.blogDiv > div');
    expect(hiddenDiv).not.toHaveStyle('display: none');
  });

  test('click twice calls the event handler twice', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
