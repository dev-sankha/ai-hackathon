# AI-Driven Asset Performance Assistant 🤖📈

A cutting-edge prototype for company AI hackathon that demonstrates an intelligent portfolio performance assistant with text and voice interactions.

## 🚀 Features

### Core Functionality
- **Natural Language Queries**: Ask questions like "How did my portfolio perform this week?" or "Show me my top gainers"
- **Voice Interface**: Speak your questions and hear AI responses using Web Speech API
- **Real-time Analytics**: Instant portfolio performance insights and calculations
- **Interactive Dashboard**: Visual portfolio overview with charts and metrics
- **Smart Insights**: AI-generated summaries of P&L, returns, and asset performance

### AI Capabilities
- **Intent Recognition**: Understands various query types (performance, assets, allocation, trends)
- **Context Awareness**: Tailored responses based on actual portfolio data
- **Natural Responses**: Human-like explanations of complex financial data
- **Voice Narration**: Text-to-speech for accessibility and hands-free use

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Frontend**: React 18, Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **AI**: Custom pattern-matching and rule-based responses
- **Voice**: Web Speech API (built into browsers)
- **Styling**: Tailwind CSS with Headless UI components

## 🏃‍♂️ Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
   - Navigate to `http://localhost:3000`
   - For voice features, use Chrome/Edge (best Speech API support)

## 📱 How to Use

### Dashboard View
- View portfolio summary cards (Total Value, P&L, Day Change, Assets)
- Switch between Performance, Holdings, and Allocation tabs
- Interactive charts show portfolio trends and asset allocation

### AI Assistant
- Click "AI Assistant" in the header
- Type questions or click the microphone for voice input
- Use quick action buttons for common queries
- Click "Listen" on responses for voice narration

### Example Queries
```
✅ "How did my portfolio perform this week?"
✅ "Show me my top gainers today"
✅ "What is my asset allocation?"
✅ "Tell me about portfolio trends"
✅ "Which stocks are underperforming?"
```

## 🎯 Demo Scenarios

Perfect for hackathon demonstrations:

1. **Portfolio Overview**: "Give me a portfolio summary"
2. **Performance Analysis**: "How did I perform this month?"
3. **Asset Insights**: "Show me my best and worst performers"
4. **Voice Interaction**: Use microphone for hands-free queries
5. **Visual Analytics**: Switch to dashboard for charts and data

## 🧠 AI Architecture

### Query Processing
- **Pattern Matching**: Regex-based intent detection
- **Entity Extraction**: Identifies timeframes, metrics, asset filters
- **Context Building**: Analyzes portfolio data for relevant insights
- **Response Generation**: Template-based natural language responses

### Data Analysis
- **Real-time Calculations**: P&L, returns, performance metrics
- **Trend Analysis**: Historical performance patterns
- **Risk Assessment**: Concentration and diversification insights
- **Comparative Analysis**: Asset performance ranking

## 📊 Mock Data

Realistic portfolio simulation includes:
- **6 Assets**: Mix of stocks (AAPL, GOOGL, MSFT, TSLA), ETF (SPY), and crypto (BTC)
- **Performance History**: 30 days of simulated market data
- **Diversified Holdings**: Multiple sectors and asset types
- **Realistic Metrics**: Market values, P&L, allocation percentages

## 🔧 Configuration

### Voice Settings
- Uses browser's built-in Speech Recognition
- Supports English (US) by default
- Text-to-speech with natural voice synthesis

### Customization
- Modify `mockPortfolio.ts` for different portfolio scenarios
- Adjust AI patterns in `aiService.ts` for new query types
- Update styling in Tailwind classes for branding

## 📈 Business Value

### Problem Solved
- **Complexity Reduction**: No need to interpret complex dashboards
- **Accessibility**: Voice interface for all users
- **Speed**: Instant insights without manual calculation
- **Engagement**: Natural conversation vs static reports

### Compliance Features
- **Descriptive Only**: No investment advice or predictions
- **Factual Responses**: Based purely on actual portfolio data
- **Risk Aware**: Highlights concentration without recommendations

## 🎨 UI/UX Highlights

- **Clean Design**: Professional financial application aesthetic
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Intuitive Navigation**: Clear dashboard vs chat distinction
- **Visual Feedback**: Loading states, success indicators
- **Accessibility**: Screen reader friendly, keyboard navigation

## 🚀 Deployment

Ready for immediate deployment:

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform.

## 🔮 Future Enhancements

- **Real Data Integration**: Connect to actual brokerage APIs
- **Advanced AI**: Integration with LLMs for more sophisticated responses
- **Multi-language**: Support for additional languages
- **Mobile App**: React Native version
- **Advanced Analytics**: Machine learning insights

## 🏆 Hackathon Ready

This prototype is specifically designed for company AI hackathons:

- ✅ **Complete Feature Set**: All core functionality implemented
- ✅ **Professional UI**: Ready for executive presentations
- ✅ **Demo Scripts**: Built-in scenarios for smooth demonstrations
- ✅ **Self-Contained**: No external API dependencies
- ✅ **Scalable Architecture**: Foundation for production development

---

**Built with ❤️ for AI innovation in financial services**
