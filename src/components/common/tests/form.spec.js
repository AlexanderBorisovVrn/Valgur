import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form';
import { FormProvider } from "@pankod/refine-react-hook-form";

describe('Form component', () => {
    let file;

    beforeEach(() => {
        file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    });

    test('should render the basic fields', () => {
        const mockOnFinishHandler = jest.fn();
        const Wrapper = (props) => {
            return (
                <FormProvider register={() => { }} handleSubmit={() => { }}>
                    {props.children}
                </FormProvider>
            );
        };
        render(
            <Wrapper>
                <Form
                    type="Test"
                    formLoading={false}
                    handleImageChange={jest.fn()}
                    onFinishHandler={mockOnFinishHandler}
                    propertyImage={null}

                />
            </Wrapper>
        );

        expect(screen.getByTestId('property-name')).toBeInTheDocument();

        expect(screen.getByTestId('property-description')).toBeInTheDocument();

        expect(screen.getByTestId('property-type')).toBeInTheDocument();

        expect(screen.getByTestId('property-price')).toBeInTheDocument();
        expect(screen.getByTestId('upload-button')).toBeInTheDocument();

    });


    test('upload  files', () => {
        const file = new File(['hello'], 'hello.png', { type: 'image/png' })
        const mockOnFinishHandler = jest.fn();
        const Wrapper = (props) => {
            return (
                <FormProvider register={() => { }} handleSubmit={() => { }}>
                    {props.children}
                </FormProvider>
            );
        };

        render(
            <Wrapper>
                <Form
                    type="Test"
                    formLoading={false}
                    handleImageChange={jest.fn()}
                    onFinishHandler={mockOnFinishHandler}
                    propertyImage={null}

                />
            </Wrapper>
        );
        const input = screen.getByTestId('upload-input')
        userEvent.upload(input, file)
        expect(input.files[0]).toStrictEqual(file)
        
    })

});


