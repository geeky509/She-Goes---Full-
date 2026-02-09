
import SwiftUI

// MARK: - She Goes iOS Native App
struct SheGoesApp: View {
    var body: some Scene {
        WindowGroup {
            MainTabView()
        }
    }
}

struct MainTabView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        ZStack(alignment: .bottom) {
            Group {
                switch selectedTab {
                case 0: HomeView()
                case 1: TasksView()
                case 2: CreateView()
                case 3: ProgressView()
                case 4: ProfileView()
                default: HomeView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            FloatingTabBar(selectedTab: $selectedTab)
        }
        .background(Color("AppBackground").ignoresSafeArea())
    }
}

// MARK: - Home View
struct HomeView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header
                HeaderComponent()
                
                // Streak Card
                HStack {
                    VStack(alignment: .leading) {
                        Text("MOMENTUM")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(Color.pink.opacity(0.8))
                        Text("12 days streak")
                            .font(.title2.bold())
                    }
                    Spacer()
                    Image(systemName: "flame.fill")
                        .foregroundColor(.orange)
                        .font(.title)
                }
                .padding(24)
                .background(Color.pink.opacity(0.1))
                .cornerRadius(30)
                
                // Daily Action Card
                VStack(alignment: .leading, spacing: 16) {
                    HStack {
                        Image(systemName: "sparkles")
                            .foregroundColor(.pink)
                        Text("DAILY MICRO-ACTION")
                            .font(.caption.bold())
                            .foregroundColor(.gray)
                        Spacer()
                    }
                    
                    Text("Reach out to one person who inspires you in your career.")
                        .font(.title3.bold())
                    
                    Text("\"Connection is the currency of growth.\"")
                        .font(.subheadline)
                        .italic()
                        .foregroundColor(.gray)
                    
                    Button(action: { /* Haptic + Confetti */ }) {
                        Text("Mark as Done")
                            .font(.headline)
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.pink)
                            .cornerRadius(20)
                    }
                }
                .padding(32)
                .background(Color.white)
                .cornerRadius(40)
                .shadow(color: Color.black.opacity(0.05), radius: 20, x: 0, y: 10)
            }
            .padding()
        }
    }
}

// MARK: - Components
struct FloatingTabBar: View {
    @Binding var selectedTab: Int
    
    var body: some View {
        HStack(spacing: 30) {
            TabButton(index: 0, icon: "house.fill", selected: $selectedTab)
            TabButton(index: 1, icon: "list.bullet", selected: $selectedTab)
            
            Button(action: { selectedTab = 2 }) {
                Image(systemName: "plus")
                    .font(.title.bold())
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.pink)
                    .clipShape(RoundedRectangle(cornerRadius: 20))
                    .shadow(color: .pink.opacity(0.3), radius: 10, y: 5)
            }
            .offset(y: -20)
            
            TabButton(index: 3, icon: "chart.bar.fill", selected: $selectedTab)
            TabButton(index: 4, icon: "person.fill", selected: $selectedTab)
        }
        .padding(.horizontal, 24)
        .padding(.vertical, 12)
        .background(Blur(style: .systemThinMaterialLight))
        .cornerRadius(35)
        .shadow(color: .black.opacity(0.1), radius: 30, y: 10)
        .padding(.horizontal)
        .padding(.bottom, 20)
    }
}

struct TabButton: View {
    let index: Int
    let icon: String
    @Binding var selectedTab: Int
    
    var body: some View {
        Button(action: { withAnimation { selectedTab = index } }) {
            Image(systemName: icon)
                .font(.system(size: 20, weight: selectedTab == index ? .bold : .medium))
                .foregroundColor(selectedTab == index ? .pink : .gray.opacity(0.5))
        }
    }
}

struct HeaderComponent: View {
    var body: some View {
        HStack {
            Image("UserAvatar")
                .resizable()
                .frame(width: 45, height: 45)
                .clipShape(Circle())
                .overlay(Circle().stroke(Color.white, lineWidth: 2))
            
            VStack(alignment: .leading) {
                Text("Good morning,")
                    .font(.caption)
                    .foregroundColor(.gray)
                Text("Dreamer")
                    .font(.headline)
            }
            
            Spacer()
            
            HStack(spacing: 12) {
                Button(action: {}) {
                    Image(systemName: "bell.fill")
                        .foregroundColor(.gray)
                        .padding(10)
                        .background(Color.white)
                        .clipShape(Circle())
                }
                Button(action: {}) {
                    Image(systemName: "gearshape.fill")
                        .foregroundColor(.gray)
                        .padding(10)
                        .background(Color.white)
                        .clipShape(Circle())
                }
            }
        }
    }
}

// Helper for Native Blur
struct Blur: UIViewRepresentable {
    var style: UIBlurEffect.Style
    func makeUIView(context: Context) -> UIVisualEffectView {
        UIVisualEffectView(effect: UIBlurEffect(style: style))
    }
    func updateUIView(_ uiView: UIVisualEffectView, context: Context) {}
}
