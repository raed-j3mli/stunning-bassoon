"use client";
import React from "react";

function MainComponent() {
  const [investment, setInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [period, setPeriod] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const calculateROI = () => {
    setError("");

    // Validate inputs
    if (!investment || !annualReturn || !period) {
      setError("Please fill in all fields");
      return;
    }

    const initialInvestment = parseFloat(investment);
    const returnRate = parseFloat(annualReturn) / 100;
    const years = parseFloat(period);

    if (isNaN(initialInvestment) || isNaN(returnRate) || isNaN(years)) {
      setError("Please enter valid numbers");
      return;
    }

    if (initialInvestment <= 0 || returnRate <= 0 || years <= 0) {
      setError("Values must be greater than zero");
      return;
    }

    // Calculate final value using compound interest formula
    const finalValue = initialInvestment * Math.pow(1 + returnRate, years);
    const totalReturn = finalValue - initialInvestment;
    const roiPercentage = (totalReturn / initialInvestment) * 100;

    setResults({
      roiPercentage: roiPercentage.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      finalValue: finalValue.toFixed(2),
    });
  };

  const resetCalculator = () => {
    setInvestment("");
    setAnnualReturn("");
    setPeriod("");
    setResults(null);
    setError("");
  };

  return (
    <RNView style={styles.container}>
      <RNStatusBar style="dark" />
      <RNScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <RNView style={styles.header}>
          <RNText style={styles.title}>ROI Calculator</RNText>
          <RNView style={styles.iconContainer}>
            <RNFontAwesome name="calculator" size={20} color="#2a2c29" />
          </RNView>
        </RNView>

        <RNView style={styles.card}>
          <RNView style={styles.inputContainer}>
            <RNText style={styles.inputLabel}>Initial Investment</RNText>
            <RNView style={styles.inputWrapper}>
              <RNText style={styles.currencySymbol}>$</RNText>
              <RNTextInput
                style={styles.input}
                value={investment}
                onChangeText={setInvestment}
                placeholder="10000"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
              />
            </RNView>
          </RNView>

          <RNView style={styles.inputContainer}>
            <RNText style={styles.inputLabel}>Annual Return Rate</RNText>
            <RNView style={styles.inputWrapper}>
              <RNTextInput
                style={styles.input}
                value={annualReturn}
                onChangeText={setAnnualReturn}
                placeholder="8"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
              />
              <RNText style={styles.percentSymbol}>%</RNText>
            </RNView>
          </RNView>

          <RNView style={styles.inputContainer}>
            <RNText style={styles.inputLabel}>Investment Period</RNText>
            <RNView style={styles.inputWrapper}>
              <RNTextInput
                style={styles.input}
                value={period}
                onChangeText={setPeriod}
                placeholder="5"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
              />
              <RNText style={styles.unitText}>years</RNText>
            </RNView>
          </RNView>

          {error ? <RNText style={styles.errorText}>{error}</RNText> : null}

          <RNView style={styles.buttonContainer}>
            <RNTouchableOpacity
              style={styles.resetButton}
              onPress={resetCalculator}
            >
              <RNText style={styles.resetButtonText}>Reset</RNText>
            </RNTouchableOpacity>

            <RNTouchableOpacity
              style={styles.calculateButton}
              onPress={calculateROI}
            >
              <RNText style={styles.calculateButtonText}>Calculate</RNText>
            </RNTouchableOpacity>
          </RNView>
        </RNView>

        {results && (
          <RNView style={styles.resultsCard}>
            <RNView style={styles.resultHeader}>
              <RNText style={styles.resultsTitle}>Results</RNText>
              <RNView style={styles.updateInfo}>
                <RNText style={styles.updateLabel}>Last calculated</RNText>
                <RNText style={styles.updateTime}>Just now</RNText>
              </RNView>
            </RNView>

            <RNView style={styles.resultItem}>
              <RNView style={styles.resultIconContainer}>
                <RNFontAwesome name="line-chart" size={16} color="#1ed67e" />
              </RNView>
              <RNView style={styles.resultContent}>
                <RNText style={styles.resultLabel}>ROI Percentage</RNText>
                <RNText style={styles.resultValue}>
                  {results.roiPercentage}%
                </RNText>
              </RNView>
            </RNView>

            <RNView style={styles.resultItem}>
              <RNView style={styles.resultIconContainer}>
                <RNFontAwesome name="money" size={16} color="#1ed67e" />
              </RNView>
              <RNView style={styles.resultContent}>
                <RNText style={styles.resultLabel}>Total Return</RNText>
                <RNText style={styles.resultValue}>
                  ${results.totalReturn}
                </RNText>
              </RNView>
            </RNView>

            <RNView style={styles.resultItem}>
              <RNView style={styles.resultIconContainer}>
                <RNFontAwesome name="bank" size={16} color="#1ed67e" />
              </RNView>
              <RNView style={styles.resultContent}>
                <RNText style={styles.resultLabel}>
                  Final Investment Value
                </RNText>
                <RNText style={styles.resultValue}>
                  ${results.finalValue}
                </RNText>
              </RNView>
            </RNView>
          </RNView>
        )}
      </RNScrollView>
    </RNView>
  );
}

const styles = RNStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2a2c29",
    letterSpacing: -1,
  },
  iconContainer: {
    padding: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#2a2c29",
    letterSpacing: -0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 18,
    letterSpacing: -0.5,
  },
  currencySymbol: {
    fontSize: 18,
    color: "#2a2c29",
    marginRight: 8,
    letterSpacing: -0.5,
  },
  percentSymbol: {
    fontSize: 18,
    color: "#2a2c29",
    marginLeft: 8,
    letterSpacing: -0.5,
  },
  unitText: {
    fontSize: 18,
    color: "#2a2c29",
    marginLeft: 8,
    letterSpacing: -0.5,
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  resetButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#f1f3f5",
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 16,
    color: "#495057",
    letterSpacing: -0.5,
  },
  calculateButton: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#272727",
    justifyContent: "center",
    alignItems: "center",
  },
  calculateButtonText: {
    fontSize: 16,
    color: "white",
    letterSpacing: -0.5,
  },
  resultsCard: {
    backgroundColor: "#b0f2c2",
    borderRadius: 24,
    padding: 24,
    marginTop: 10,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2a2c29",
    letterSpacing: -0.5,
  },
  updateInfo: {
    alignItems: "flex-end",
  },
  updateLabel: {
    fontSize: 12,
    color: "gray",
    letterSpacing: -0.5,
  },
  updateTime: {
    fontSize: 14,
    color: "#2a2c29",
    letterSpacing: -0.5,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  resultIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  resultContent: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 14,
    color: "gray",
    letterSpacing: -0.5,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2a2c29",
    letterSpacing: -0.5,
  },
});

export default MainComponent;