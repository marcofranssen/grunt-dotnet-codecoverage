
using ExcludedCode;

using Machine.Specifications;
using MyCode;

namespace MySpecs
{
    [Subject("Awesomeness using node.js grunt test runner"), Tags("nodejs", "grunt")]
    public class When_adding_using_the_calculator
    {
        Establish context = () => Calculator = new Calculator();

        Because of = () => Result = Calculator.Add(3, 4);

        It should_result_in_seven = () => Result.ShouldEqual(7);

        private static Calculator Calculator;
        private static int Result;
    }

    [Subject("Awesomeness using node.js grunt test runner"), Tags("nodejs", "grunt")]
    public class When_multiplying_using_the_calculator
    {
        Establish context = () => Calculator = new Calculator();

        Because of = () => Result = Calculator.Multiply(5, 8);

        It should_result_in_seven = () => Result.ShouldEqual(40);

        private static Calculator Calculator;
        private static int Result;
    }

    [Subject("Awesomeness using node.js grunt test runner"), Tags("nodejs", "grunt")]
    public class When_dividing_using_the_calculator
    {
        Establish context = () => Calculator = new Calculator();

        Because of = () => Result = Calculator.Divide(8, 4);

        It should_result_in_two = () => Result.ShouldEqual(2);

        private static Calculator Calculator;
        private static int Result;
    }

    [Subject("Awesomeness using node.js grunt test runner"), Tags("nodejs", "grunt")]
    public class When_Calling_An_Excluded_Method
    {
        Establish context = () => Excluded = new ExcludedClass();

        Because of = () => Result = Excluded.Foo();

        It should_result_in_42 = () => Result.ShouldEqual(42);

        private static ExcludedClass Excluded;
        private static int Result;
    }
}
